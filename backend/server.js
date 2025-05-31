const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const { spawn } = require('child_process');

async function getRekomendasiFromPython(kategori, kabupaten_kota, rating_min, top_n=20) {
  return new Promise((resolve, reject) => {
    const input = JSON.stringify({ kategori, kabupaten_kota, rating_min, top_n });

    const py = spawn('python', ['recomendation.py'], { cwd: Path.join(__dirname, '../backend') });

    let stdoutData = '';
    let stderrData = '';

    py.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    py.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
      console.warn('[PY WARNING]', chunk.toString());
    });

    py.on('close', () => {
      try {
        const lines = stdoutData.trim().split('\n');
        let result;
        for (let i = lines.length - 1; i >= 0; i--) {
          try {
            result = JSON.parse(lines[i]);
            break;
          } catch {}
        }
        if (result !== undefined) {
          resolve(result);
        } else {
          reject({ error: 'Gagal parsing hasil rekomendasi.', log: stderrData || stdoutData });
        }
      } catch (e) {
        reject({ error: 'Gagal parsing hasil rekomendasi.', log: stderrData || stdoutData });
      }
    });

    py.stdin.write(input);
    py.stdin.end();
  });
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      },
      files: {
        relativeTo: Path.join(__dirname, '../frontend')
      }
    }
  });

  await server.register(Inert);

  server.route({
    method: 'POST',
    path: '/rekomendasi',
    handler: async (request, h) => {
      const { kategori, kabupaten_kota, rating_min, top_n } = request.payload;

      console.log(`Menerima request: kategori=${kategori}, kabupaten_kota=${kabupaten_kota}, rating_min=${rating_min}, top_n=${top_n}`);

      try {
        const rekomendasi = await getRekomendasiFromPython(
          kategori,
          kabupaten_kota,
          rating_min,
          top_n || 20
        );
        return h.response(rekomendasi).code(200);
      } catch (error) {
        console.error(error);
        return h.response({ message: 'Terjadi kesalahan dalam memproses rekomendasi.' }).code(500);
      }
    }
  });

  await server.start();
  console.log('✅ Server running at:', server.info.uri);
};

init();

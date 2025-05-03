import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    let raw = req.body.vg_filesupload_response;
    let files = [];

    // Handle if it's a JSON string
    if (typeof raw === 'string') {
      try {
        raw = JSON.parse(raw);
      } catch (parseErr) {
        return res.json({
          debug: '❌ Failed parsing JSON string in vg_filesupload_response',
          image_url: '',
          image2_url: '',
          image3_url: '',
          image4_url: ''
        });
      }
    }

    // Handle if it's already a JS object
    if (typeof raw === 'object' && raw.files) {
      files = raw.files;
    } else {
      return res.json({
        debug: '❌ vg_filesupload_response missing or not an object with .files',
        image_url: '',
        image2_url: '',
        image3_url: '',
        image4_url: ''
      });
    }

    const image_url  = files[0]?.url || '';
    const image2_url = files[1]?.url || '';
    const image3_url = files[2]?.url || '';
    const image4_url = files[3]?.url || '';

    return res.json({
      image_url,
      image2_url,
      image3_url,
      image4_url,
      debug: `✅ Parsed ${files.length} image(s)`
    });

  } catch (err) {
    return res.json({
      image_url: '',
      image2_url: '',
      image3_url: '',
      image4_url: '',
      debug: `❌ Top-level error: ${err.message}`
    });
  }
});

app.listen(10000, () => {
  console.log('✅ Server live on port 10000');
});




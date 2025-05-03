import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    let files = [];

    // Step 1: Check if the field is a JSON string or an actual object
    const raw = req.body.vg_filesupload_response;

    if (typeof raw === 'string') {
      try {
        files = JSON.parse(raw).files || [];
      } catch (innerErr) {
        return res.json({
          debug: 'Failed to parse nested JSON string in vg_filesupload_response',
          image_url: '',
          image2_url: '',
          image3_url: '',
          image4_url: ''
        });
      }
    } else if (typeof raw === 'object') {
      files = raw.files || [];
    } else {
      return res.json({
        debug: 'vg_filesupload_response is neither string nor object',
        image_url: '',
        image2_url: '',
        image3_url: '',
        image4_url: ''
      });
    }

    // Step 2: Extract up to 4 image URLs
    const image_url = files[0]?.url || '';
    const image2_url = files[1]?.url || '';
    const image3_url = files[2]?.url || '';
    const image4_url = files[3]?.url || '';

    return res.json({
      image_url,
      image2_url,
      image3_url,
      image4_url,
      debug: `Successfully parsed ${files.length} file(s)`
    });

  } catch (err) {
    return res.json({
      image_url: '',
      image2_url: '',
      image3_url: '',
      image4_url: '',
      debug: `Top-level failure: ${err.message}`
    });
  }
});

app.listen(10000, () => {
  console.log('✅ Server live on port 10000');
});



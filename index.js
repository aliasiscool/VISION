const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const { vg_filesupload_response } = req.body;

  let debug = '';
  let image_url = '', image2_url = '', image3_url = '', image4_url = '';

  try {
    const parsed = JSON.parse(vg_filesupload_response);
    const files = parsed?.files || [];

    image_url  = files[0]?.url || '';
    image2_url = files[1]?.url || '';
    image3_url = files[2]?.url || '';
    image4_url = files[3]?.url || '';

    debug = `Parsed ${files.length} files successfully.`;
  } catch (err) {
    debug = `Error parsing vg_filesupload_response: ${err.message}`;
  }

  return res.json({
    image_url,
    image2_url,
    image3_url,
    image4_url,
    debug
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));


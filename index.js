const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/parseImages', (req, res) => {
  const { vg_filesupload_response } = req.body;

  let files = [];
  let debug = { success: false, message: '', raw: vg_filesupload_response };

  try {
    const parsed = JSON.parse(vg_filesupload_response);
    files = parsed?.files || [];

    debug.success = true;
    debug.message = 'Parsed successfully';
    debug.totalFiles = files.length;
  } catch (err) {
    debug.message = 'Failed to parse vg_filesupload_response: ' + err.message;
    return res.status(400).json({ error: debug });
  }

  const responsePayload = {
    image_url: files[0]?.url || "",
    image2_url: files[1]?.url || "",
    image3_url: files[2]?.url || "",
    image4_url: files[3]?.url || "",
    debug
  };

  res.json(responsePayload);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

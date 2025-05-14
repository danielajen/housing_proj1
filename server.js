require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/api/statcan', async (req, res) => {
  try {
    const statcanResponse = await axios.post(
      'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorsAndLatestNPeriods',
      req.body
    );
    res.json(statcanResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
<h2>To make project work you need to do the following</h2>
<p>1. Install mongodb locally. To do that run following commands (Linux):</p>
<ul>
  <li>
    <code>sudo apt install -y mongodb</code> || <i>to install mongodb</i>
  </li>
  <li>
    <code>sudo systemctl enable mongodb</code> || <i>to make mongodb server run on startup</i>
  </li>
  <li>
    <code>sudo service mongodb start</code> || <i>to start mongodb server (if not started)</i>
  </li>
</ul>
<p>2. Install all dependencies (frontend and backend) by running <code>npm run install-all</code></p>
<p>3. Create .env file in root folder. The app will need this environment variables:</p>
<ul>
  <li><code>DB_URL=mongodb://localhost:27017/docgen</code> <i>#(!is required!)</i> </li>
  <li><code>PORT=3000</code> <i>#(optional)</i></li>
  <li><code>MAIL_CONNECTION_JSON</code></li>
</ul>
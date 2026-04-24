const https = require('https');

/**
 * Creates a GitHub Pull Request.
 * 
 * Usage: node create_gh_pr.cjs <repo_owner> <repo_name> <head> <base> <title> <body> <token>
 */

async function createPR() {
  const [,, owner, repo, head, base, title, body, token] = process.argv;

  if (!owner || !repo || !head || !base || !title || !body || !token) {
    console.error('Missing required arguments.');
    console.error('Usage: node create_gh_pr.cjs <repo_owner> <repo_name> <head> <base> <title> <body> <token>');
    process.exit(1);
  }

  const data = JSON.stringify({
    title,
    body,
    head,
    base,
  });

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}/pulls`,
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Gemini-CLI-Skill',
      'Content-Length': data.length,
    },
  };

  const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const json = JSON.parse(responseBody);
        console.log(`✅ Success! Pull Request created: ${json.html_url}`);
      } else {
        console.error(`❌ Error creating Pull Request (Status ${res.statusCode}):`);
        console.error(responseBody);
        process.exit(1);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error);
    process.exit(1);
  });

  req.write(data);
  req.end();
}

createPR();

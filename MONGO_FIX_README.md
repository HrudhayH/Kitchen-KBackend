# MongoDB Atlas SRV Connection Fix - README

## Overview
This automation diagnoses MongoDB Atlas SRV connection failures and provides a safe fallback to standard connection strings.

---

## Files Created

1. **`test-mongo.js`** - Standalone connection test script
2. **`scripts/fix-mongo.sh`** - Diagnostic and repair automation

---

## How to Get Standard (Non-SRV) Connection String from Atlas

1. Go to your MongoDB Atlas cluster
2. Click **"Connect"**
3. Choose **"Connect your application"**
4. Look for a toggle or option that says **"Standard connection string"** (vs SRV)
5. Copy the connection string that looks like:
   ```
   mongodb://host1:27017,host2:27017,host3:27017/kitchen_kettles?replicaSet=atlas-xxxxx-shard-0&authSource=admin&ssl=true
   ```
6. Replace `<username>` and `<password>` with your actual credentials

---

## URL-Encode Password (if special characters present)

If your password contains special characters like `@`, `#`, `:`, `/`, etc., you must URL-encode it.

**Python snippet:**
```python
import urllib.parse
password = "Kitchen@123#"  # your actual password
encoded = urllib.parse.quote(password, safe='')
print(encoded)  # outputs: Kitchen%40123%23
```

Then use the encoded password in your connection string.

---

## Usage

### 1) Test Current Connection (Diagnostic Mode)
```bash
cd kk-backend
./scripts/fix-mongo.sh
```
This will:
- Check SRV DNS resolution
- Show current `MONGO_URI` from `.env`
- Run `test-mongo.js` to test connection
- Report success or failure

### 2) Apply Standard Connection String Fix
```bash
cd kk-backend
STANDARD_URI="mongodb://kitchenAdmin:Kitchen123@host1:27017,host2:27017,host3:27017/kitchen_kettles?replicaSet=atlas-xxxxx-shard-0&authSource=admin&ssl=true" ./scripts/fix-mongo.sh
```
This will:
- Back up your `.env` file (timestamped backup)
- Replace `MONGO_URI` with the standard connection string
- Re-run the test
- NOT commit to git (manual backup only)

### 3) Manual Test Only
```bash
cd kk-backend
MONGO_URI="mongodb+srv://kitchenAdmin:Kitchen123@kk-api.h89wter.mongodb.net/kitchen_kettles?retryWrites=true&w=majority" node test-mongo.js
```

---

## Troubleshooting

### Still failing after fix?
- **Network issue**: Try connecting from a different network (mobile hotspot)
- **Password encoding**: Ensure password special characters are URL-encoded
- **Firewall**: Check Atlas network access whitelist (add your IP or allow `0.0.0.0/0` for testing)
- **Credentials**: Verify username/password in Atlas → Database Access

### Restore backup
```bash
cd kk-backend
cp .env.backup.XXXXXXXXXX .env  # use actual timestamp
```

---

## Security Notes

- Script creates **local backups only** (not committed to git)
- `.env` files should remain in `.gitignore`
- Never commit credentials to version control
- Use environment variables in production (not `.env` files)

---

## Support

If issues persist after trying standard connection string:
1. Check MongoDB Atlas status page
2. Verify cluster is running (not paused)
3. Test from MongoDB Compass GUI
4. Contact Atlas support with connection logs

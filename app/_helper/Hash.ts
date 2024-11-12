export async function hashWithSalt(inputText: string): Promise<string> {
  // Step 1: Generate a random salt (e.g., 16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Step 2: Convert input text to a byte array (Uint8Array)
  const encoder = new TextEncoder();
  const inputData = encoder.encode(inputText);

  // Step 3: Concatenate the salt and input text bytes together
  const combinedData = new Uint8Array(inputData.length + salt.length);
  combinedData.set(inputData, 0);  // Copy input data to the beginning
  combinedData.set(salt, inputData.length);  // Append salt to the end

  // Step 4: Hash the combined data using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData);

  // Step 5: Convert the hash result and salt to hex strings
  const hashedString = bufferToHex(hashBuffer);
  const saltString = bufferToHex(salt);

  // Step 6: Return both salt and hash in a single string (separated by a dot)
  return `${saltString}.${hashedString}`;
}

// Helper function to convert ArrayBuffer to a hex string
function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const byteArray = new Uint8Array(buffer);
  const hexArray = byteArray.map(byte => byte.toString(16).padStart(2, '0')).join("");
  return hexArray;
}

export async function verifyHash(
  inputText: string,
  storedHashWithSalt: string
): Promise<boolean> {
  // Step 1: Extract salt and hash from the stored string
  const [storedSalt, storedHash] = storedHashWithSalt.split(".");

  // Convert stored salt from hex back to bytes (Uint8Array)
  const salt = hexToBuffer(storedSalt);

  // Step 2: Convert the input text to a byte array
  const encoder = new TextEncoder();
  const inputData = encoder.encode(inputText);

  // Step 3: Combine the input text and the extracted salt
  const combinedData = new Uint8Array(inputData.length + salt.length);
  combinedData.set(inputData, 0);
  combinedData.set(salt, inputData.length);

  // Step 4: Hash the combined data using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData);
  const inputHash = bufferToHex(hashBuffer);

  // Step 5: Compare the input hash with the stored hash
  return inputHash === storedHash;
}

// Helper function to convert hex to ArrayBuffer
function hexToBuffer(hex: string): Uint8Array {
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    byteArray[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return byteArray;
}
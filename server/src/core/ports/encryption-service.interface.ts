export type IEncryptionService = {
    encrypt(plaintext: string): string
    decrypt(ciphertext: string): string
}
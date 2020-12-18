import * as crypto from 'crypto'

export default class SecurityService {
  static generatePasswordHash(password: string): string {
    const secret = 'hello world'
    return crypto.createHmac('sha1', secret).update(password).digest('hex')
  }

  static validatePassword(password: string, hash: string): boolean {
    return SecurityService.generatePasswordHash(password) === hash
  }
}

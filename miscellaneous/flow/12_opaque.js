'use strict'
// @flow

export type Payment = { from: string, to: string, amount: number }
export opaque type VerifiedPayment: Payment = Payment//{ ...$Exact<Payment>, varified: true }

export async function verify(p: Payment): Promise<VerifiedPayment> {
  return { ...p, varified: true }
}

export function make(p: VerifiedPayment): boolean {
  return true
}

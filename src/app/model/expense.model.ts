export interface Expense {
    expenseType: string,
    expenseDescription: string,
    vendorName: String,
    dtOfExpense: Date,
    totalAmount: number,
    paymentType: string,
    paymentStatus: string,
    amountPaid: number,
    paymentMode: string,
    referenceNo: string,
    dtOfPayment: Date,
    expensePic: string,
    isApproved: string,
    ApprovedBy: string,
    dtOfApproval: Date
}
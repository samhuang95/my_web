const SEND_CREATE_INVOICE = {
    subject: `Urgent: Overdue payment for Invoice {Invoice-Number}`,
    content: `
    <p>Hi {user-name},</p>
    
    <p>Despite our previous reminders, we note with concern that payment for Invoice {Invoice-Number}, which was due on {Payment-due-date}, remains outstanding.</p>
    
    <p>Regrettably, we must inform you that, as a result, we have suspended your account, and all cloud tokens under your account are no longer accessible.</p>
    
    <p>This is a time-sensitive matter requiring your immediate attention. Kindly reach out to us promptly to address and settle this issue. If you have any queries regarding this invoice or if there's a problem that is delaying payment, we would appreciate it if you could let us know so that we can assist you further.</p>
    
    <p>Best regard,</p>

    <p>DataXquad</p>
    `,
};

module.exports = {
    SEND_CREATE_INVOICE,
};

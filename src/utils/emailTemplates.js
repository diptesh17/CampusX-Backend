exports.applicationStatusTemplate = ({
  candidateName,
  jobTitle,
  status
}) => {
  return `
    <div style="font-family: Arial, sans-serif">
      <h2>Hello ${candidateName},</h2>
      <p>Your application for <b>${jobTitle}</b> has been updated.</p>
      <p><b>Current Status:</b> ${status}</p>
      <br/>
      <p>Best wishes,<br/>Recruitment Team</p>
    </div>
  `;
};

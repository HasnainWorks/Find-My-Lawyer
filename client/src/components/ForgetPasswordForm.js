// import React, { useState } from 'react';

// const ForgotPasswordForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         setMessage('Password reset email sent');
//       } else {
//         setMessage('Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleForgotPassword}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPasswordForm;

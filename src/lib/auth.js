// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "../models/userModel";
// import { connect } from "../dbConfig/dbConfig";
// import bcryptjs from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextRequest, NextResponse } from "next/server";

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         try {
//           connect();

//           const { email, password } = credentials;

//           const user = await User.findOne({ email });

//           if (!user) {
//             return NextResponse.json(
//               { error: "Invalid Credentials!" },
//               { status: 400 }
//             );
//           }

//           const validPassword = await bcryptjs.compare(password, user.password);
//           if (!validPassword) {
//             return NextResponse.json(
//               { error: "Invalid password" },
//               { status: 400 }
//             );
//           }

//           const token = await jwt.sign(
//             { userId: user._id },
//             process.env.TOKEN_SECRET,
//             {
//               expiresIn: "1d",
//             }
//           );

//           const response = NextResponse.json({
//             message: "Login successful",
//             success: true,
//           });

//           response.cookies.set("token", token, {
//             httpOnly: true,
//           });

//           return response;
//         } catch (error) {
//           console.error("Error during authentication:", error);
//           return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//           );
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },

//   // callbacks: {
//   //   session: ({ session, token }) => {
//   //     return {
//   //       ...session,
//   //       user: {
//   //         ...session.user,
//   //         ...token,
//   //       },
//   //     };
//   //   },

//   //   jwt: async ({ token, user }) => {
//   //     return {
//   //       ...token,
//   //       ...user,
//   //     };
//   //   },
//   // },
// };

import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import ThirdParty from 'supertokens-node/recipe/thirdparty';

export default function initSuperTokens() {
  supertokens.init({
    framework: 'express',
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: 'MERNnote App',
      apiDomain: process.env.API_DOMAIN || 'http://localhost:5001',
      websiteDomain:
        process.env.WEBSITE_DOMAIN || 'http://localhost:5173',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({
        signUpFeature: {
          formFields: [
            {
              id: 'email',
              validate: async (value) => {
                if (typeof value !== 'string') {
                  return 'Please enter a valid email';
                }
                return undefined;
              },
            },
            {
              id: 'password',
              validate: async (value) => {
                if (typeof value !== 'string') {
                  return 'Please enter a valid password';
                }
                return undefined;
              },
            },
          ],
        },
      }),
      ThirdParty.init({
        signInAndUpFeature: {
          providers: [
            {
              config: {
                thirdPartyId: 'google',
                clients: [
                  {
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
                ],
              },
            },
            {
              config: {
                thirdPartyId: 'github',
                clients: [
                  {
                    clientId: process.env.GITHUB_CLIENT_ID,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                  },
                ],
              },
            },
          ],
        },
      }),
      Session.init({
        cookieSameSite: 'lax',
        cookieSecure: process.env.NODE_ENV === 'production',
      }),
    ],
  });
}

initSuperTokens();

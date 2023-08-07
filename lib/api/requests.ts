import { Auth } from "aws-amplify";
import axios, { AxiosRequestConfig, Method } from "axios";
import https from "https";

const agent = new https.Agent({
	rejectUnauthorized: false,
});

// Set a default base URL for axios
axios.defaults.baseURL = process.env.API_BASE_URL;

export interface IRequestOptions {
	method: Method;
	url: string;
	data?: any;
	params?: any;
	headers?: any;
}

export const sendRequest = async (options: IRequestOptions) => {
	// Get the access token from indexed db (NoSQL store)
	let token;
	try {
		// Auth.currentSession() automatically refreshes the token if expired
		const session = await Auth.currentSession();
		// Id token provides info about the user such as email
		// Access token contains scopes of what the user can do
		token = session.getIdToken().getJwtToken();
	} catch (error) {
		console.error("Error getting session:", error);
		throw error;
	}
	const requestOptions: AxiosRequestConfig = {
		method: options.method,
		url: options.url,
		data: options.data,
		params: options.params,
		headers: {
			...options.headers,
			// Add the token here
			"Content-type": "application/json",
			"Access-Control-Allow-Origin": "*",
			Authorization: `Bearer ${token}`,
		},
		httpsAgent: agent,
	};
	try {
		const response = await axios(requestOptions);
		return response;
	} catch (error) {
		console.error(`Error sending request to ${options.url}:`, error);
		throw error;
	}
};

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { authStorage, type RudexAuth } from "./AuthStorage";

// function parseAuthFromCurrentUrl(): RudexAuth | null {
//   const href = window.location.href;
//   const url = new URL(href);

//   let params: URLSearchParams = url.searchParams;

//   if (!params.get("accessToken")) {
//     const h = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
//     params = new URLSearchParams(h);
//   }

//   if (!params.get("accessToken") && href.includes("%23")) {
//     const after = href.split("%23")[1] ?? "";
//     params = new URLSearchParams(after);
//   }

//   const userId = params.get("userId") ?? "";
//   const accessToken = params.get("accessToken") ?? "";
//   const refreshToken = params.get("refreshToken") ?? "";
//   const accessTokenExpiryDate = params.get("accessTokenExpiryDate") ?? "";

//   if (!userId || !accessToken || !refreshToken || !accessTokenExpiryDate) return null;

//   return { userId, accessToken, refreshToken, accessTokenExpiryDate };
// }

// const GoogleCallbackPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     const data = parseAuthFromCurrentUrl();

//     if (!data) {
//       setError("Missing auth data in callback URL");
//       return;
//     }

//     authStorage.set(data);
//     navigate("/dashboard", { replace: true });
//   }, [navigate]);

//   if (!error) return null;

//   return (
//     <div className="p-6 text-sm">
//       <h1 className="text-xl font-bold">Google callback failed</h1>
//       <p className="mt-2">{error}</p>

//       <div className="mt-4">
//         <div className="font-semibold">Current URL:</div>
//         <pre className="mt-2 p-3 rounded bg-black/10 overflow-auto">
//           {window.location.href}
//         </pre>
//       </div>

//       <button
//         className="mt-4 underline"
//         onClick={() => navigate("/login", { replace: true })}
//       >
//         Back to Login
//       </button>
//     </div>
//   );
// };

// export default GoogleCallbackPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import { authStorage, type RudexAuth } from "./AuthStorage";

function parseAuthFromCurrentUrl(): RudexAuth | null {
  const href = window.location.href;
  const url = new URL(href);

  let params: URLSearchParams = url.searchParams;

  if (!params.get("accessToken")) {
    const h = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
    params = new URLSearchParams(h);
  }
  
  if (!params.get("accessToken") && href.includes("%23")) {
    const after = href.split("%23")[1] ?? "";
    params = new URLSearchParams(after);
  }

  const userId = params.get("userId") ?? "";
  const accessToken = params.get("accessToken") ?? "";
  const refreshToken = params.get("refreshToken") ?? "";
  const accessTokenExpiryDate = params.get("accessTokenExpiryDate") ?? "";

  if (!userId || !accessToken || !refreshToken || !accessTokenExpiryDate) return null;

  return { userId, accessToken, refreshToken, accessTokenExpiryDate };
}

const redactUrl = (href: string) =>
  href
    .replace(/(accessToken=)[^&]+/g, "$1[redacted]")
    .replace(/(refreshToken=)[^&]+/g, "$1[redacted]");

const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const ran = React.useRef(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {

    if (ran.current) return;
    ran.current = true;

    const data = parseAuthFromCurrentUrl();

    if (!data) {
      setError("Missing auth data in callback URL");
      return;
    }

    authStorage.set(data);
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  if (!error) return null;

  const safeUrl = redactUrl(window.location.href);

  return (
    <div className="p-6 text-sm">
      <h1 className="text-xl font-bold">Google callback failed</h1>
      <p className="mt-2">{error}</p>

      <div className="mt-4">
        <div className="font-semibold">Current URL:</div>
        <pre className="mt-2 p-3 rounded bg-black/10 overflow-auto">{safeUrl}</pre>
      </div>

      <button className="mt-4 underline" onClick={() => navigate("/login", { replace: true })}>
        Back to Login
      </button>
    </div>
  );
};

export default GoogleCallbackPage;

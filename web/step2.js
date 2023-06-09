export function getSessionCookie(cookieName) {
    let cookies = document.cookie.split(";"); // Split cookies by ';'
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim(); // Trim leading/trailing whitespace
      
      // Check if the cookie starts with the provided name
      if (cookie.indexOf(cookieName + "=") === 0) {
        // Return the cookie value (substring after the name and '=')
        return cookie.substring(cookieName.length + 1);
      }
    }
    
    // Return null if the cookie is not found
    return null;
  };

  export const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src =FILE_URL;

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script ＄{FILE_URL}`
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};
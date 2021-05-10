export default class ConfigLoader {
    async fetchJsonFile(url) {
        if (url) {
            try {
                return await fetch(url);
            } catch (error) {
                console.log(error);
                return null;
            }
        } else {
            const config = {
                "template": {
                    "name": "My front builder",
                    "topic": "no-code"
                }
            };
            return config;
        }
    }
} 
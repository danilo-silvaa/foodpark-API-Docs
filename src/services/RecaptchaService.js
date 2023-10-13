import axios from 'axios';

export class RecaptchaV3 {
    constructor() {
        this.secretKey = process.env.RECAPTCHA_SECRET_KEY || '';
        this.recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    }

    async verify(request) {
        try {
            const recaptcha = request.body?.recaptcha;

            if (!recaptcha) {
                return false;
            }

            const { data } = await axios.post(this.recaptchaVerifyUrl, null, {
                params: {
                    secret: this.secretKey,
                    response: recaptcha,
                    remoteip: request.ip,
                },
            });

            if (!data.success) {
                return false;
            }

            const allowedDomains = process.env.RECAPTCHA_DOMAINS.split(', ');

            if (!allowedDomains.includes(data.hostname)){
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

}
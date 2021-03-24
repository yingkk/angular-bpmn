import config from './i18n-zh.config';

export default function customTranslate(template, replacements) {
    replacements = replacements || {};
    template = config[template] || template;
    return template.replace(/{([^}]+)}/g, (_, key: string) => {
        return replacements[key] || '{' + key + '}';
    });
}
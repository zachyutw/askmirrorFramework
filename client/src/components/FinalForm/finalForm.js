import _ from 'lodash';
export const formRegisterFields = (form, fields) => {
    fields.map((field) => {
        form.registerField(field.name, () => ({}), {});
        return form;
    });
};

export const getMeta = (fields, metaFields) => {
    const meta = {};
    fields.map(({ name }) => {
        meta[name] = {};
        metaFields.map(({ name: metaName, value: metaValue }) => {
            meta[name][metaName] = metaValue[name];
            return meta[name];
        });
        return meta;
    });
    return meta;
};

export const getMetaClassNames = (meta) => _.keys(_.pickBy(meta, _.identity)).join(' ');

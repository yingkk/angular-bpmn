export class FormElementBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    placeholder: string;
    options: { key: string, value: string, checked?: boolean }[];
    min: number;
    max: number;
    step: number;
    mode: string;

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        placeholder?: string;
        options?: { key: string, value: string, checked?: boolean }[];
        min?: number;
        max?: number;
        step?: number;
        mode?: string;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.placeholder = options.placeholder || '';
        this.options = options.options || [];
        this.min = options.min || 0;
        this.max = options.max || 10;
        this.step = options.step || 1;
        this.mode = options.mode || 'default';
    }
}

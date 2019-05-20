export const bodyRect = document.body.getBoundingClientRect();
export const getElementOffestTop = (el) => {
    elReact = el.getBoundingClientRect();
    return elReact.top - bodyRect.top;
};

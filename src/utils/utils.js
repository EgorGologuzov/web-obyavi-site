export function isPointInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function cleanPhone(phone) {
    return phone?.replace(/[^0-9+]/g, '');
}

export function formatPhone(phone){
    return `${phone.slice(0,2)} (${phone.slice(2,5)}) ${phone.slice(5,8)} ${phone.slice(8,10)}-${phone.slice(10,phone.length)}`
}

export function busyProcess(busy, setBusy, process) {
    if (busy) {
        return;
    }

    setBusy(true);
    process().finally(() => setBusy(false));
}

export function busyProcessWithFail(busy, setBusy, setFail, process) {
    if (busy) {
        return;
    }

    setBusy(true);
    process()
        .then(() => setFail(false))
        .catch((err) => {setFail(true); console.log(err);})
        .finally(() => setBusy(false));
}

export function mapAdPropsFromObjToList({ objProp, allPropsList }) {
    const result = [];
    for (let key in objProp) {
        const template = allPropsList.find((prop) => prop.name == key);
        if (!template) continue;
        template.value = objProp[key];
        result.push(template);
    }

    return result;
}

export function filterUndefinedProps({ propsList }) {
    const result = propsList.filter((prop) => prop.value !== undefined);
    return result;
}

export function removeHtmlTags(str) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = str;
    return tempDiv.textContent || tempDiv.innerText || "";
}

function removeAttributesAndScripts(htmlString) {
    // Создаем временный элемент
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Функция для удаления атрибутов у всех элементов
    function removeAllAttributes(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Удаляем все атрибуты
            Array.from(node.attributes).forEach(attr => node.removeAttribute(attr.name));
        }
        // Рекурсивно обходим все дочерние элементы
        Array.from(node.childNodes).forEach(removeAllAttributes);
    }

    // Удаляем атрибуты у корневого элемента
    removeAllAttributes(tempDiv);

    // Удаляем все теги <script>
    const scripts = tempDiv.getElementsByTagName("script");
    while (scripts.length > 0) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }

    return tempDiv.innerHTML; // Возвращаем очищенный HTML
}

export function formatShortDesc(text) {
    if (!text) {
        return text;
    }

    text = text.replaceAll("\n", " ");
    text = text.replaceAll("<br>", " ");
    text = text.replaceAll("<br/>", " ");
    text = removeHtmlTags(text);

    return text;
}

export function formatDesc(text) {
    if (!text) {
        return text;
    }

    text = text.replaceAll("\n", "<br>");
    text = removeAttributesAndScripts(text);

    return text;
}

export function formatDescForEdit(text) {
    if (!text) {
        return text;
    }

    text = text.replaceAll("<br>","\n");
    text = text.replaceAll("<br/>","\n");

    return text;
}

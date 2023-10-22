export const getSpanishMonth = (date) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[date.getMonth()];
};

export const convertImageToBase64 = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


export const arrayChunk = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

export const colorsGroup = ['#A7D397', '#FFF2D8', '#FF6969', '#35A29F', '#26577C', '#713ABE', '#FFFD8C', '#FFDBAA', '#ED7D31', '#BCA37F', "#D988B9", "#8DDFCB", "#6499E9", "#B0D9B1", "#FF6AC2", "#164B60", "#FF6969", "#6C5F5B"];
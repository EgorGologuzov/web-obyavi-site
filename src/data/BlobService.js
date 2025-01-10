
export function useBlobService() {
    return fakeService;
}

const fakeService = {
    uploadImages({ files }) {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        return new Promise((resolve, _) => {
            setTimeout(() => {
                const result = files.map((file) => URL.createObjectURL(file));
                resolve(result);
            }, 500)
        })
    }
}
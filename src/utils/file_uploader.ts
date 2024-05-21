/**
 * Class FileUploader.
 * @param ioptions dict object with options for uploaded
 * ioptions = {
 * 	 uploadType: string,
 * 	 uploadscript: string(endpoint),
 * 	 uploadId: string(uuid id),
 * 	 portion: int (Kb portion size),
 * 	 csrfToken: string,
 * }
 */
export default function FileUploader(this: any, ioptions: {
    uploadType: string,
    uploadscript: string,
    uploadId: string,
    portion: number,
    csrfToken: string,
    files: File[],
}): any {
    this.position = 0;
    this.filesize = 0;
    this.file = null;
    this.files = ioptions.files
    this.type = ioptions.uploadType
    this.options = ioptions;
    this.result = null;
    if (this.options['uploadscript'] == undefined) return null;
    this.CheckBrowser = function () {
        // if (window.File && window.FileReader && window.FileList && window.Blob) return true; else return false;
        // We are can not usong this option on ServiceWorkers, so return True always
        return true
    }

    this.UploadPortion = function (from: string) {
        var reader = new FileReader();
        var that = this;
        var loadfrom = from;
        var blob = null;

        /*
        * Событие срабатывающее после чтения части файла в FileReader
        * @param evt Событие
        */
        reader.onloadend = function (evt) {
            if (evt.target && evt.target.readyState == FileReader.DONE) {
                var requestOptions = {
                    headers: {
                        "Content-Type": "multipart/form-data;boundary=0",
                        "Upload-Id": that.options['uploadId'],
                        "Portion-From": from,
                        "Portion-Size": that.options['portion'].toString(),
                        "Authorization": `Token ${ioptions.csrfToken}`
                    },
                    method: 'POST',
                    body: that.blob
                }
                fetch(that.options['uploadscript'], requestOptions)
                    .then(response => {
                        if (response.ok) {
                            that.position += that.options['portion'];
                            if (that.filesize > that.position) {
                                setTimeout(() => that.UploadPortion(that.position), 500)
                                window.dispatchEvent(new CustomEvent('UPLOADED_STATUS', {
                                    detail: that.position / that.filesize * 100
                                }))
                            } else {
                                // If all portion is uploaded send this server, method GET,
                                // скрипт тот-же.
                                let getRequestOption = {
                                    headers: {
                                        "Upload-Id": that.options['uploadId'],
                                        "Authorization": `Token ${ioptions.csrfToken}`
                                    },
                                    method: 'GET'
                                }
                                // let params = JSON.stringify(that.options['excelOptions'])
                                try {
                                    fetch(that.options['uploadscript'] + `?action=done&type=${that.type}`, getRequestOption)
                                        .then(response => {
                                            if (response.ok) {
                                                try {
                                                    response.json()
                                                        .then(data => {
                                                            window.dispatchEvent(new CustomEvent('success', {
                                                                detail: {data: data, type: that.type}
                                                            }))
                                                        })
                                                        .catch(() => {
                                                            window.dispatchEvent(new CustomEvent('success', {
                                                                detail: 'ok'
                                                            }))
                                                        })
                                                } catch (e) {
                                                    window.dispatchEvent(new CustomEvent('success', {
                                                        detail: 'ok'
                                                    }))
                                                }
                                            }
                                            if (!response.ok) {
                                                response.json()
                                                .then(data => {
                                                    window.dispatchEvent(new CustomEvent('upload_error', {
                                                        detail: data.error
                                                    }))
                                                })
                                            }
                                        })
                                } catch (e) {
                                    console.log(e);
                                } finally {
                                    window.dispatchEvent(new CustomEvent('success', {
                                        detail: 'ok'
                                    }))
                                }
                            }
                        } else {
                            // upload crashed
                            // send delete file comand
                            let getRequestOption = {
                                headers: {
                                    "Upload-Id": that.options['uploadId']
                                },
                                method: 'GET'
                            }
                            fetch(that.options['uploadscript'] + '?action=abort', getRequestOption)
                                .then(r => {
                                    if (r.ok) {
                                        window.dispatchEvent(new CustomEvent('FILE_ABORT', {}))
                                    }
                                })
                        }
                    })
            }
        }

        that.blob = null;

        // Read portion in object Blob. Три условия для трех возможных определений Blob.[.*]slice().
        if (this.file.slice) that.blob = this.file.slice(from, from + that.options['portion']);
        else {
            if (this.file.webkitSlice) that.blob = this.file.webkitSlice(from, from + that.options['portion']);
            else {
                if (this.file.mozSlice) that.blob = this.file.mozSlice(from, from + that.options['portion']);
            }
        }

        // Read Blob (file portion) in FileReader
        reader.readAsBinaryString(that.blob);
    }

    /*
    * uoload file on server
    * return Number. If not 0, error
    */
    this.Upload = function () {

        if (!this.file) return -1;

        else {
            // send first portion
            this.UploadPortion(0);
        }
    }

    if (this.CheckBrowser()) {

        // SET default value
        if (this.options['portion'] == undefined) this.options['portion'] = 1048576;

        var that = this;

        if (that.files) {
            // @ts-ignore
            for (var i = 0, f; f = that.files[i]; i++) {
                that.filesize = f.size;
                that.file = f;
                break;
            }
        }
        that.Upload()
    }
}
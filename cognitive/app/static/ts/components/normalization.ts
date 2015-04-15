interface NormalizationComponentCreateParams {
    component_type: string;
    component_id: number;
    op_type: string;
}

interface NormalizationComponentPutParams {
    component_type: string;
    component_id: number;
    op_type: string;
}


class Normalization extends ComponentBase {

    private column_type: string;
    private column_idx: number;
    private operation: string;

    constructor () {
        super({
            "name": "Normalization",
            "width": 0,
            "height":0,
            "input":1,
            "output":1
        })
    }

    public create_request(params: NormalizationComponentCreateParams){

        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;

        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };

        var api_url = '/api/v1' + '/operations/normalization/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    }

    public put_request(params: NormalizationComponentPutParams) {

        this.column_type = params.component_type;
        this.column_idx = params.component_id;
        this.operation = params.op_type;

        var json_data = {
            component_type: params.component_type,
            component_id: params.component_id,
            op_type: params.op_type
        };

        var api_url = '/api/v1' + '/operations/normalization/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    }

    public delete_request() {
        var api_url = '/api/v1'  + '/operations/normalization/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    }

    private click_edit(e): void {

    }
}
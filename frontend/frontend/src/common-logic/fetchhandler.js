export function fetch_add_params (p_params_as_json){
	var l_esc = encodeURIComponent;
	var l_retval = Object.keys(p_params_as_json)
		.map(k => l_esc(k) + '=' + l_esc(p_params_as_json[k]))
		.join('&');
	return l_retval
}

export function fetch_data_v2(
	p_method,
	p_uri,
	p_extra_headers = {},
	p_body = {},
	p_fnc = ()=>{}
) {
	let l_uri = p_uri;
	let l_headers = Object.assign({
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}, p_extra_headers);
	let l_init = {
		method: p_method,
		headers: l_headers,
	}
	if (p_method === "POST") l_init.body = JSON.stringify(p_body);
	else l_uri += "?" + fetch_add_params(p_body);
	fetch(l_uri, l_init)
		.then((response) => response.json())
		.then((responseJson) => p_fnc(responseJson))
		.catch((err) => {
			alert(err);
		});
}

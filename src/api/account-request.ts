type AccountRequest = {
    id: number;
}

export async function accountRequest(token: string) {
    const url = 'https://api.themoviedb.org/3/account/account_id';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };


    const response = await fetch(url, options);
    const json: AccountRequest = await response.json();
    localStorage.setItem("account", JSON.stringify(json.id));
    console.log(json.id);
}
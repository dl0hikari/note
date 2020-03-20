import axios from 'axios';

interface getKeywordsProp {
  keywords: Array<{ keyword: string }>
}

export const getKeywords = (num: number) => {
    return axios.get<getKeywordsProp>('/getKeywords', { params: { num: num } })
        .then(res => res.data);
}

import axios from 'axios';

interface getKeywordsProp {
  keywords: Array<{ keyword: string }>
}

export const getKeywords = (num: number) => {
    return axios.get<getKeywordsProp>('/getKeywords', { params: { num: num },  })
        .then(res => res.data);
}
interface getInfoProps{
  isGraduate: string;
  levelInfo: {
    level16: string;
    level4: string;
    level1: string;
  };
  studyTime: string;
  fdzRank: {
    rank: number;
    percent: string;
  },
  isTopLevel: boolean;
  studyLevel: number;
  timeToUpdate: string;
  provinceRank: {
    rank: number;
    percent: string;
  };
  countryRank: {
    rank: number;
    percent: string;
  }
}
export const getInfo = () => {
    return axios.post<getInfoProps>('/v1/myclassroom/studyTalent')
}

import React, { useEffect, useState } from 'react';
import Service from '../../Lib/Service';

interface keyword{
    keyword: string;
}

export default function Navigation(){
    let [keywords, setKeywords] = useState<keyword[]>([]);

    useEffect(() => {
        Service.Apis.getKeywords(3)
            .then(res => setKeywords(res.keywords));
    }, []);
    return (
        <div>
            {
                keywords.map((item, index) => <div key={index}>{item.keyword}</div>)
            }
        </div>
    );
}

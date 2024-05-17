import React from 'react';
import { Category } from '@/app/lib/types';

type Props = {
    data: Category[];
};

const Card: React.FC<Props> = ({ data }) => {
    console.log(data);

    return (
        <div>

            {data.map((category, index) => (
                <div key={index}>
                    {category.menus.map((menu) => (
                        <li key={menu.id}>{menu.product_name}</li>
                    ))}
                </div>
            ))}


        </div>
    );
};

export default Card;

import React from 'react';

export function Item({ name, description, children }) {
    return (
        <div className='row mb-2'>
            <div className='col-6 align-self-center p-0'>
                <h6 className='my-0'>
                    { name }
                </h6>
                {
                    description ?
                    <p className='my-0 text-body-tertiary'>
                        <small>
                            { description }
                        </small>
                    </p>
                    : undefined
                }
            </div>
            <div className='col-6 align-self-center p-0'>
                { children }
            </div>
        </div>
    );
}
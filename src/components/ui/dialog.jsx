'use client'

export default function Dialog(props) {
    const { title, openParam, onOK, onClose, open, children } = props

    return (
        open && (
            <dialog className='dlg' open={open}>
                <div className='hdr'>
                    <span>{title}</span>
                    <button className='close' onClick={onClose}>
                        🗙
                    </button>
                </div>
                {children}
                <div className='footer'>
                    {onOK && (
                        <button className='btn' onClick={onOK}>
                            OK
                        </button>
                    )}
                    {onClose && (
                        <button className='btn' onClick={onClose}>
                            Close
                        </button>
                    )}
                </div>
            </dialog>
        )
    )
}

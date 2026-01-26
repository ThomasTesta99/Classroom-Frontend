import { CLOUDINARY_CLOUD_NAME } from '@/constants';
import { UploadWidgetValue } from '@/types';
import { UploadCloud } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const UploadWidget = ({value = null, onChange, disabled = false}) => {
  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  const [deleteToken, setDeleteToken] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(()  => {
    setPreview(value);
    if(!value) setDeleteToken(null);
  }, [value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if(typeof window === 'undefined') return;

    const initializeWidget = () => {
      if(!window.cloudinary || widgetRef.current) return false;
      widgetRef.current = window.cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CLOUD_NAME, 
        
      })
    }

  })
  
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);

  const openWidget = () => {
    if(!disabled) widgetRef.current?.open();
  }

  const removeFromCloudinary = async () => {}


  return (
    <div className='space-y-2'>
      {preview ? (
        <div className="upload-preview"></div>
      ): <div className='upload-dropzone' role="button" tabIndex={0} onClick={openWidget} onKeyDown={(event) => {
        if(event.key === "Enter"){
          event.preventDefault();
          openWidget();
        }
      }}>
        <div className="upload-prompt">
          <UploadCloud className='icon'/>
          <div>
            <p>Click to upload photo</p>
            <p>PNG, JPG up to 5 MB</p>
          </div>
        </div>
        </div>}
    </div>
  )
}

export default UploadWidget

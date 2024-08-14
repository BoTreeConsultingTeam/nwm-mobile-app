import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { useFetchAPIData } from './common';
import { deletePhoto, getAllPhotos, uploadNewPhoto } from '../api /uploadPhoto';
import { useSelector } from 'react-redux';

export const useUploadPhoto = ({ navigation, route }) => {
  const [photoList, setPhotoList] = useState([]);
  const [uploadBody, setUploadBody] = useState({});
  const [getPhotoBody, setGetPhotoBody] = useState({});
  const [deleteBody, setDeleteBody] = useState({});

  const user = useSelector(state => state.login.user);
  console.log({
    projectId: route.params?.projectId,
    userId: user.id,
  });
  useEffect(() => {
    setGetPhotoBody({
      projectId: route.params?.projectId,
      userId: user.id,
    });
  }, []);

  const handleAddPhoto = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      const formData = new FormData();

      formData.append('files', {
        uri: image.path,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      setUploadBody({
        data: formData,
        userId: user.id,
        projectId: route.params?.projectId,
      });
      // navigation.navigate('mediaPage', {
      //   path: image.path,
      // });
    });
  };

  const handleGetPhoto = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
    }).then(photo => {
      const formData = new FormData();
      photo.map(item => {
        formData.append('files', {
          uri: item.path,
          type: 'image/jpg',
          name: 'image.jpg',
        });
      });
      setUploadBody({
        data: formData,
        userId: user.id,
        projectId: route.params?.projectId,
      });
    });
  };

  const handleDeleteImage = path => {
    setDeleteBody([path]);
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'upload':
        {
          setUploadBody({});
          setGetPhotoBody({
            userId: user.id,
            projectId: route.params?.projectId,
          });
        }
        break;
      case 'get':
        {
          setPhotoList(data.data);
          setGetPhotoBody({});
        }
        break;
      case 'delete': {
        setDeleteBody([]);
        setGetPhotoBody({
          userId: user.id,
          projectId: route.params?.projectId,
        });
      }
    }
  };

  const [{ isLoading }] = useFetchAPIData({
    apiCallCondition: !!Object.keys(uploadBody).length,
    apiFunction: uploadNewPhoto,
    accessPath: ['data'],
    apiParams: uploadBody,
    successCb: data => successCb(data, 'upload'),
    dependencyArray: [uploadBody],
    showSuccessMessage: true,
    failureCb: e => console.log(e),
  });

  useFetchAPIData({
    apiCallCondition: !!Object.keys(getPhotoBody).length,
    apiFunction: getAllPhotos,
    accessPath: ['data'],
    apiParams: getPhotoBody,
    successCb: data => successCb(data, 'get'),
    dependencyArray: [getPhotoBody],
    failureCb: e => console.log(e),
  });

  useFetchAPIData({
    apiCallCondition: deleteBody.length,
    apiFunction: deletePhoto,
    accessPath: ['data'],
    apiParams: {
      body: deleteBody,
      userId: user.id,
      projectId: route.params?.projectId,
    },
    successCb: data => successCb(data, 'delete'),
    dependencyArray: [deleteBody],
    showSuccessMessage: true,
    failureCb: e => console.log(e),
  });

  return [
    {
      isLoading,
      photoList,
    },
    {
      handleAddPhoto,
      handleGetPhoto,
      handleDeleteImage,
    },
  ];
};

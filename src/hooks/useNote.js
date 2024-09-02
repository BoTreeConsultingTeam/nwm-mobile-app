/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import { useSelector } from 'react-redux';
import {
  addInspectionNote,
  addProjectNote,
  deleteInspectionNote,
  deleteProjectNote,
  getInspectionNotes,
  getProjectNotes,
} from '../api/notes';

export const useNote = ({ params }) => {
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('project');
  const [projectNoteBody, setProjectNoteBody] = useState({});
  const [getProjectNoteBody, setGetProjectNoteBody] = useState({});
  const [listOfProjectNotes, setListOfProjectNotes] = useState([]);

  const [inspectionNoteBody, setInspectionNoteBody] = useState({});
  const [getInspectionNoteBody, setGetInspectionNoteBody] = useState({});
  const [listOfInspectionNotes, setListOfInspectionNotes] = useState([]);
  const [deleteNoteBody, setDeleteNoteBody] = useState({});
  const [editNoteData, setEditData] = useState({});

  const user = useSelector(state => state.login.user);

  useEffect(() => {
    setGetProjectNoteBody({
      projectId: params.projectId,
      userId: user.id,
    });
    setGetInspectionNoteBody({
      projectId: params.projectId,
      userId: user.id,
    });
  }, []);

  const handleAddNoteClick = () => {
    setAddNoteModalOpen(!isAddNoteModalOpen);
  };

  const handleCloseNoteClick = () => {
    setAddNoteModalOpen(false);
    setEditData({});
  };

  const handleTabChange = tab => {
    setCurrentTab(tab);
  };

  const handleNoteSubmit = (data, type) => {
    let body = {
      firstName: user.username,
      createdBy: user.id,
      note: data.notes,
      projectId: params.projectId,
    };
    if (type === 'inspection') {
      setInspectionNoteBody({
        ...body,
        ...(Object.keys(editNoteData).length && { id: editNoteData.id }),
      });
    } else {
      setProjectNoteBody({
        ...body,
        ...(Object.keys(editNoteData).length && { id: editNoteData.id }),
      });
    }
  };

  const handleDeleteNote = data => {
    setDeleteNoteBody({
      noteId: data.id,
      userId: user.id,
    });
  };

  const handleEditNoteClick = data => {
    setEditData(data);
    setAddNoteModalOpen(true);
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'addProject':
        {
          setAddNoteModalOpen(false);
          setProjectNoteBody({});
          setGetProjectNoteBody({
            projectId: params.projectId,
            userId: user.id,
          });
          setEditData({});
        }
        break;
      case 'getProject':
        {
          setListOfProjectNotes(data.data);
          setGetProjectNoteBody({});
        }
        break;
      case 'addInspection':
        {
          setAddNoteModalOpen(false);
          setInspectionNoteBody({});
          setGetInspectionNoteBody({
            projectId: params.projectId,
            userId: user.id,
          });
          setEditData({});
        }
        break;
      case 'getInspection':
        {
          setListOfInspectionNotes(data.data);
          setGetInspectionNoteBody({});
        }
        break;
      case 'delete': {
        if (currentTab === 'inspection') {
          setGetInspectionNoteBody({
            projectId: params.projectId,
            userId: user.id,
          });
        } else {
          setGetProjectNoteBody({
            projectId: params.projectId,
            userId: user.id,
          });
        }
        setDeleteNoteBody({});
      }
    }
  };

  useFetchAPIData({
    apiCallCondition: Object.keys(projectNoteBody).length,
    apiParams: projectNoteBody,
    apiFunction: addProjectNote,
    dependencyArray: [projectNoteBody],
    accessPath: ['data'],
    successCb: data => successCb(data, 'addProject'),
    failureCb: e => {
      console.log(e);
    },
    showSuccessMessage: true,
  });

  const [{ isLoading: isProjectNoteLoading }] = useFetchAPIData({
    apiCallCondition: Object.keys(getProjectNoteBody).length,
    apiParams: getProjectNoteBody,
    apiFunction: getProjectNotes,
    dependencyArray: [getProjectNoteBody],
    accessPath: ['data'],
    successCb: data => successCb(data, 'getProject'),
    failureCb: e => {
      console.log(e);
    },
  });

  useFetchAPIData({
    apiCallCondition: Object.keys(inspectionNoteBody).length,
    apiParams: inspectionNoteBody,
    apiFunction: addInspectionNote,
    dependencyArray: [inspectionNoteBody],
    accessPath: ['data'],
    successCb: data => successCb(data, 'addInspection'),
    failureCb: e => {
      console.log(e);
    },
    showSuccessMessage: true,
  });

  const [{ isLoading: isInspectionNoteLoading }] = useFetchAPIData({
    apiCallCondition: Object.keys(getInspectionNoteBody).length,
    apiParams: getInspectionNoteBody,
    apiFunction: getInspectionNotes,
    dependencyArray: [getInspectionNoteBody],
    accessPath: ['data'],
    successCb: data => successCb(data, 'getInspection'),
    failureCb: e => {
      console.log(e);
    },
  });

  useFetchAPIData({
    apiCallCondition: Object.keys(deleteNoteBody).length,
    apiParams: deleteNoteBody,
    apiFunction:
      currentTab === 'project' ? deleteProjectNote : deleteInspectionNote,
    dependencyArray: [deleteNoteBody],
    accessPath: ['data'],
    successCb: data => successCb(data, 'delete'),
    failureCb: e => {
      console.log(e);
    },
    showSuccessMessage: true,
  });

  return [
    {
      isAddNoteModalOpen,
      currentTab,
      listOfProjectNotes,
      listOfInspectionNotes,
      isInspectionNoteLoading,
      isProjectNoteLoading,
      editNoteData,
    },
    {
      handleAddNoteClick,
      handleNoteSubmit,
      handleTabChange,
      handleDeleteNote,
      handleEditNoteClick,
      handleCloseNoteClick,
    },
  ];
};

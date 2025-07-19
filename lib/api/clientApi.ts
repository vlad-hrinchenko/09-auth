// lib/api/clientApi.ts

import { nextServer } from './api';
import type { Note, NotesResponse, NewNote } from '@/types/note';
import type { User, UserRequest, CheckSessionResponse } from '@/types/user';
import { AxiosError } from 'axios';

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== 'All' && { tag }),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (data: UserRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: UserRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await nextServer.get<CheckSessionResponse>('/auth/session');
    return { success: res.status === 200, message: res.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      success: false,
      message: err.response?.data.message ?? 'Session check failed',
    };
  }
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export const updateUser = async (userData: { username: string }): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', userData);
  return res.data;
};

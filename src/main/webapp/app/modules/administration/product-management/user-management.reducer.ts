import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IProduct, defaultValue } from 'app/shared/model/product.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IProduct>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const apiUrl = 'api/products';
const adminUrl = 'api/products';

// Async Actions

export const getUsers = createAsyncThunk('userManagement/fetch_users', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IProduct[]>(requestUrl);
});

export const getUsersAsAdmin = createAsyncThunk('userManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${adminUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IProduct[]>(requestUrl);
});

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  const response = await axios.get<any[]>(`api/authorities`);
  response.data = response?.data?.map(authority => authority.name);
  return response;
});

export const getUser = createAsyncThunk(
  'userManagement/fetch_user',
  async (id: string) => {
    console.log('Product id in get User:',id);
    const requestUrl = `${adminUrl}/${id}`;
    return axios.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createUser = createAsyncThunk(
  'userManagement/create_user',
  async (user: IProduct, thunkAPI) => {
    const formData = new FormData();
    
    formData.append('enName', user.enName);
    formData.append('esName', user.esName);
    formData.append('frName', user.frName);
    formData.append('nlName', user.nlName);
    
    formData.append('enDescription', user.enDescription);
    formData.append('esDescription', user.esDescription);
    formData.append('frDescription', user.frDescription);
    formData.append('nlDescription', user.nlDescription);
    
    formData.append('origin', user.origin);
    formData.append('weightKg', user.weightKg.toString());
    formData.append('price', user.price.toString());
    formData.append('stockQuantity', user.stockQuantity.toString());
    formData.append('categoryId', user.categoryId);

    if (user.imageFile) {
      formData.append('image', user.imageFile);
    }

    try {
      const result = await axios.post<IProduct>(adminUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      thunkAPI.dispatch(getUsersAsAdmin({}));
      
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
  { serializeError: serializeAxiosError },
);


export const updateUser = createAsyncThunk(
  'userManagement/update_user',
  async (user: IProduct, thunkAPI) => {
    console.log('user before update:', user);

    // Create FormData to send as multipart form data
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('idDisabled', user.idDisabled);
    formData.append('enName', user.enName);
    formData.append('esName', user.esName);
    formData.append('frName', user.frName);
    formData.append('nlName', user.nlName);
    formData.append('enDescription', user.enDescription);
    formData.append('esDescription', user.esDescription);
    formData.append('frDescription', user.frDescription);
    formData.append('nlDescription', user.nlDescription);
    formData.append('origin', user.origin);
    formData.append('weightKg', user.weightKg.toString());
    formData.append('price', user.price.toString());
    formData.append('stockQuantity', user.stockQuantity.toString());
    formData.append('categoryId', user.categoryId);

    // If there's an image, append it as well
    if (user.imageFile) {
      formData.append('image', user.imageFile);
    }

    // If the image is deleted (no new image and old image is removed), pass null to backend
    if (!user.imageFile && !user.imageUrl) {
      formData.append('image', null); // Notify the backend that no image should be attached
    }

    // Perform the PUT request with FormData
    const result = await axios.put<IProduct>(`${adminUrl}/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for multipart
      },
    });

    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);


export const deleteUser = createAsyncThunk(
  'userManagement/delete_user',
  async (id: string, thunkAPI) => {
    const requestUrl = `${adminUrl}/${id}`;
    const result = await axios.delete<IProduct>(requestUrl);
    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export type UserManagementState = Readonly<typeof initialState>;

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState as UserManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.user = defaultValue;
      })
      .addMatcher(isFulfilled(getUsers, getUsersAsAdmin), (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(getUsers, getUsersAsAdmin, getUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createUser, updateUser, deleteUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getUsers, getUsersAsAdmin, getUser, getRoles, createUser, updateUser, deleteUser), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = UserManagementSlice.actions;

// Reducer
export default UserManagementSlice.reducer;

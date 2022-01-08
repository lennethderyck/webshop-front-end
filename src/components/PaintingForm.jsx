import { useEffect, useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import "../css/form.css";
import Swal from "sweetalert2";
import { storage } from "../firebase/index";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import LabelInput from "./form/LabelInput";
import LabelSelect from "./form/LabelSelect";
import Sidebar from "./SideBar";
import { TypeData } from "../data/typesData";
import { usePaintings } from "../context/PaintingProvider";

const validationRuleRequired = { required: "This field is required!" };

export default function PaintingForm() {
  const types = TypeData.map((x) => x.type);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(0);

  const loc = useLocation();
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit, reset, setValue } = methods;

  const { currentPainting, setPaintingToUpdate, createOrUpdatePainting } =
    usePaintings();

  //This code makes sure that there is a custom alert screen when called
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //Checks if there is a currentPainting so that it can fill in the values of the form
  useEffect(() => {
    if (
      // check on non-empty object
      currentPainting &&
      (Object.keys(currentPainting).length !== 0 ||
        currentPainting.constructor !== Object)
    ) {
      setValue("name", currentPainting.name);
      setValue("type", currentPainting.type);
      setValue("price", currentPainting.price);
      setValue("description", currentPainting.description);
      const size = currentPainting.size.split("x");
      setValue("width", size[0].slice(0, -2));
      setValue("height", size[1].slice(0, -1));
    } else {
      reset();
    }
  }, [currentPainting, setValue, reset]);

  //Updates the currentPainting by taken the ID from the pathname
  useEffect(() => {
    const id = loc.pathname.split("/")[2];
    setPaintingToUpdate(id);
  }, [setPaintingToUpdate, loc]);

  // Is called when the submit button is clicked
  const onSubmit = useCallback(
    async (data) => {
      try {
        setData(data);
        if (!currentPainting?.id) {
          const file = data.img[0];
          await uploadFiles(file);
        } else {
          setImage(currentPainting.img);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [currentPainting]
  );

  /*
   * This triggers when the image is set to make sure that it won't trigger before the image is set
   * If this would be called first then there wouldn't be an image in the createOrUpdatePainting function
   */
  useEffect(() => {
    if (image) {
      createOrUpdatePainting({
        id: currentPainting?.id,
        name: data.name,
        type: data.type,
        price: data.price,
        size: data.width + "W x " + data.height + "H",
        description: data.description,
        img: image,
      });
      setPaintingToUpdate(null);
      history.push("/products");
      if (!currentPainting?.id) {
        Toast.fire({
          icon: "success",
          title: "Painting added to products!",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Painting updated!",
        });
      }
    }
  }, [
    image,
    Toast,
    createOrUpdatePainting,
    currentPainting,
    data,
    history,
    setPaintingToUpdate,
  ]);

  /*
   *   This function makes sure that an image is uploaded to an extern database
   *   It can also show the progress of this function because it can sometimes take a while
   */
  const uploadFiles = async (file) => {
    if (!file) return;
    console.log("Begin uploadFile");
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setImage(url));
      }
    );
  };

  //Shows the form to add or edit a painting
  return (
    <>
      <Sidebar />
      <div className="box-admin-pages">
        <div className="create">
          <h2>{currentPainting?.id ? "Change Painting" : "Add a Painting"}</h2>
          {progress !== 0 && <progress value={progress} max="100" />}
          {progress === 0 && (
            <FormProvider {...methods}>
              <form
                className="form-inline formText"
                onSubmit={handleSubmit(onSubmit)}
              >
                <LabelInput
                  className="create-input"
                  label="name"
                  type="text"
                  defaultValue=""
                  validation={validationRuleRequired}
                  data-cy="name_input"
                />
                <LabelSelect
                  className="create-input"
                  label="type"
                  options={types}
                  validation={validationRuleRequired}
                  data-cy="type_select"
                />
                <LabelInput
                  className="create-input"
                  label="price"
                  type="text"
                  defaultValue=""
                  validation={validationRuleRequired}
                  data-cy="price_input"
                />
                <LabelInput
                  className="create-input"
                  label="width"
                  type="text"
                  defaultValue=""
                  validation={validationRuleRequired}
                  data-cy="width_input"
                />
                <LabelInput
                  className="create-input"
                  label="height"
                  type="text"
                  defaultValue=""
                  validation={validationRuleRequired}
                  data-cy="height_input"
                />
                <LabelInput
                  className="create-input"
                  label="description"
                  type="text"
                  defaultValue=""
                  validation={validationRuleRequired}
                  data-cy="description_input"
                />
                {currentPainting?.id ? (
                  ""
                ) : (
                  <LabelInput
                    className="create-input"
                    label="img"
                    type="file"
                    defaultValue=""
                    validation={validationRuleRequired}
                    data-cy="img_input"
                  />
                )}
                <button type="submit" data-cy="submit_painting">
                  {" "}
                  {currentPainting?.id ? "Save Painting" : "Add Painting"}
                </button>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </>
  );
}

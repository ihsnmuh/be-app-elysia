import Elysia from "elysia";
import { loggerProd } from "../utils/loggerProd";
import { loggerDev } from "../utils/loggerDev";
import { allDataNote } from "../const/dataNotes";

export const notesRoutes = new Elysia({ prefix: "/notes" })

  .decorate("logger", process.env.NODE_ENV === "prod" ? loggerProd : loggerDev)

  // for exemple to give user information
  .derive(({ headers }) => {
    const { authorization } = headers;

    if (authorization === "Mytoken1") {
      return {
        userId: 123,
        userName: "Ihsan",
      };
    }
  })

  // for handling authorization
  .onBeforeHandle(({ headers, set }) => {
    const { authorization } = headers;

    if (!authorization) {
      set.status = 401;
      return {
        massage: "Please login first",
      };
    }

    if (authorization !== "Mytoken1") {
      set.status = 401;
      return {
        massage: "Your Auth is not allowed",
      };
    }
  })

  //* get all notes
  .get("/", ({ userName, logger }) => {
    // call data base to get note by userID
    // .....

    logger.info(`get notes for user ${userName}`);

    return {
      meta: {
        code: 200,
        message: "success",
      },
      data: allDataNote,
    };
  })

  //* get not by id
  .get("/:idNote", ({ params, logger, userName, set }) => {
    const { idNote } = params;

    // for example filter from dummies data
    const filltedNote = allDataNote.filter(
      (data) => data.id === Number(idNote)
    );

    if (filltedNote.length > 0) {
      logger.info(`get note ${idNote} for user ${userName}`);
    }

    if (filltedNote.length < 1) {
      logger.error(`note with id ${idNote} for user ${userName} not found`);
      set.status = 404;
      return {
        meta: {
          code: 404,
          message: "data not found",
        },
        data: filltedNote,
      };
    }

    return {
      meta: {
        code: 200,
        message: "success",
      },
      data: filltedNote,
    };
  })

  //* create note
  .post("/", ({ body, set, logger }) => {
    const note = body?.note as string;

    const newData = [...allDataNote, { id: Math.random(), note: note }];
    console.log("🚀 ~ .post ~ newData:", newData);
    logger.info(`success create note`);
    set.status = 201;

    return {
      meta: {
        code: 201,
        message: "Success",
      },
      data: {
        note: note,
      },
    };
  })

  //* Update note
  .patch("/:idNote", ({ params, logger, body }) => {
    const { idNote } = params;
    const { note } = body;

    const dataFilter = allDataNote.filter((note) => note.id !== Number(idNote));
    const newData = [...dataFilter, { id: Number(idNote), note }];
    console.log("🚀 ~ .patch ~ dataNew:", newData);
    logger.info(`patch note ${idNote}`);

    return {
      meta: {
        code: 200,
        message: "Success",
      },
      data: {
        id: Number(idNote),
        note: note,
      },
    };
  })

  //* delete note
  .delete("/:idNote", ({ params, logger }) => {
    const { idNote } = params;

    const dataFilter = allDataNote.filter((note) => note.id !== Number(idNote));
    logger.info("success delete note");
    console.log(dataFilter);

    return {
      meta: {
        code: 200,
        message: "Success",
      },
    };
  });

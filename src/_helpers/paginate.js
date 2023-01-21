exports.getPaginatedRecords = async (
    model,
    { limit: specifiedLimit = 10, page, data = {}, selectedFields }
  ) => {
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
  
      const modelData = await model.find({ ...data }).countDocuments();
  
      const result = await model
        .find({ ...data })
        .select(selectedFields ? selectedFields : "")
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      return {
        data: result,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
  };
  
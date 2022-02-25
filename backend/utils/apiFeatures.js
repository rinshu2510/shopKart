class ApiFeatures {
    constructor(query, querystr) {

        this.query = query;
        this.querystr = querystr;

    }
    search() {
        const keyword = this.querystr.keyword ?
            {

                name: {
                    $regex: this.querystr.keyword,
                    $options: 'i',
                },

            } : {};


        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {

        // if we do queryCopy = this.querystr then if we do any changes in queryCopy then those changes will also reflect in this.querystr 
        // because in javascript all object is passed through refrence therefore the below method is use to create copy of querystr

        const queryCopy = { ...this.querystr };

        // removing some field for category
        // console.log(queryCopy);
        const removeFields = ["keyword", "page", "limit"];


        removeFields.forEach((key) => delete queryCopy[key]);


        // console.log(queryCopy);

        // filter for Price and rating 

        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        querystr = JSON.parse(querystr)

        // console.log(querystr)
        // console.log(queryCopy);
        this.query = this.query.find({ ...querystr });
        // this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination(resultPerPage) {
        // console.log(this.querystr);
    
        const currentPage = Number(this.querystr.page) || 1;
        // console.log(currentPage);
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}

module.exports = ApiFeatures;
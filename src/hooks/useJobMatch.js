import { useState } from "react";

import { analyzeJobMatch } from "../services/jobMatchService";

export function useJobMatch() {

    const [loading, setLoading] = useState(false);

    const analyze = async (

        resume,

        jobDescription

    ) => {

        try {

            setLoading(true);

            return await analyzeJobMatch(

                resume,

                jobDescription

            );

        }

        finally {

            setLoading(false);

        }

    };

    return {

        analyze,

        loading

    };

}
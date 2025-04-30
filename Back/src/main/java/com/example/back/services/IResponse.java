package com.example.back.services;



import com.example.back.entities.Response;


import java.util.List;
import java.util.Map;


public interface IResponse {
    Response addResponse(Response response);
    Response updateResponse(Response response);
    void deleteResponse(Long id);




    List<Response> retrieveAllResponses();


    public Map<String, Long> getResponsesPerDay();






    List<Response> getResponsesByComplaintId(Long complaintId);


    Response getResponseById(Long id);
}




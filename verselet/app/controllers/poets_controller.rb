class PoetsController < ApplicationController
  before_action :set_poet, only: [:show, :update, :destroy]

  # GET /poets
  def index
    poets = Poet.all

    render json: poets
  end

  # GET /poets/1
  def show
    render json: @poet
  end

  # POST /poets
  def create
    @poet = Poet.new(poet_params)

    if @poet.save
      render json: @poet, status: :created, location: @poet
    else
      render json: @poet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /poets/1
  def update
    if @poet.update(poet_params)
      render json: @poet
    else
      render json: @poet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /poets/1
  def destroy
    @poet.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poet
      @poet = Poet.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def poet_params
      params.require(:poet).permit(:name, :style)
    end
end
